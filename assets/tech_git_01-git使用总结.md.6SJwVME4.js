import{_ as e,c as i,o,al as g}from"./chunks/framework.QMC68jD7.js";const l=JSON.parse('{"title":"��1��git remote add origin git@github.com:eblen007/test.git","description":"","frontmatter":{},"headers":[],"relativePath":"tech/git/01-git使用总结.md","filePath":"tech/git/01-git使用总结.md","lastUpdated":1777271852000}'),r={name:"tech/git/01-git使用总结.md"};function n(p,t,a,s,u,h){return o(),i("div",null,[...t[0]||(t[0]=[g(`<p>=========================================���زֿ�Ĳ���</p><p>һ�� �����汾�� �� git init</p><pre><code> �Ա������û���������������ã�
		�鿴����  git config --list

		git config --global user.name &quot;Your Name&quot;

		git config --global user.email &quot;email@example.com&quot;
</code></pre><p>���������� ������---&gt; git add �ļ��� ��git add . ����ȫ���� ---&gt;�ݴ���----&gt;git commit -m &quot;&quot; ----&gt;�汾�� (���ɰ汾��)</p><p>�����鿴���������ݴ�����״̬�� git status</p><p>�ġ��鿴�汾��¼�� git log | git log --pretty=oneline | git reflog</p><p>�塢�汾����</p><p>��1�������汾����: git reset --hard �汾��</p><p>��2�� �����ļ��İ汾���� git checkout �汾�� �ļ�����·��+�ļ���</p><p>�������ɾ�����޸ģ����ӣ����ȷ��Ҫ�����ڼ�¼�У���һ��Ҫgit commit</p><p>==========================================Զ�ֿ̲��ʹ��</p><p>һ�������ǹ�����github�����ƣ�������https��Ҳ������sshЭ�飬��ssh���������Կ�����</p><p>��1��������Կ</p><pre><code>    ssh-keygen -t rsa -C &quot;747094687@qq.com&quot;

(2) ��github����������ģ�  SSH --&gt; ������Կ���ѱ�����Կ������ճ��ȥ��
</code></pre><p>������github���½��ֿ⣺ new repository , ���Ը��Ʋֿ��git��ַ��sshЭ�飩</p><p>�����ڱ��ؿ�¡Զ�ֿ̲⣺ git clone git��ַ</p><p>�ġ���ô�ѱ��ذ汾�����͵�Զ�ֿ̲⣺</p><h1 id="��1��git-remote-add-origin-git-github-com-eblen007-test-git" tabindex="-1">��1��git remote add origin <a href="mailto:git@github.com" target="_blank" rel="noreferrer">git@github.com</a>:eblen007/test.git <a class="header-anchor" href="#��1��git-remote-add-origin-git-github-com-eblen007-test-git" aria-label="Permalink to &quot;��1��git remote add origin git@github.com:eblen007/test.git&quot;">​</a></h1><pre><code>BUG:  ������ִ��� ��  fatal: remote origin already exists.

      1��������$ git remote rm origin



      2��������$ git remote add origin git@github.com:djqiang/gitdemo.git �Ͳ��ᱨ���ˣ�
</code></pre><h1 id="��2��-git-push-u-origin-master" tabindex="-1">��2�� git push -u origin master <a class="header-anchor" href="#��2��-git-push-u-origin-master" aria-label="Permalink to &quot;��2�� git push -u origin master&quot;">​</a></h1><pre><code>BUG:  

   (1) ���һ�����µĲ����Ƿ�git commit,  ����ύ����ִ�и�����


   ��2��������������ԭ�򣬶�git push���ɹ�������git pull origin master  ��git pull origin master --allow-unrelated-histories  ���������༭״̬�������롱:wq���س��˳����� ��ִ����������



  ��3��git push -u origin master �������µı���

$ git push -u origin master
To github.com:wfteacher/yts0226.git
! [rejected]        master -&gt; master (non-fast-forward)
error: failed to push some refs to &#39;git@github.com:wfteacher/yts0226.git&#39;
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Integrate the remote changes (e.g.
hint: &#39;git pull ...&#39;) before pushing again.
hint: See the &#39;Note about fast-forwards&#39; in &#39;git push --help&#39; for details.

��������� git push --force origin master   �������ͳɹ�



  (4)git�ϴ����ƴ�����ʾ������ϢYou do not have permission to push to the repository via HTTPS

ԭ��һ  
</code></pre><p>�������±����»������ܶ඼���Լ��������´�ģ�������һ���յ���Ŀ֮�������ʾ��һ��git��ȫ������</p><p>git config --global user.name &quot;your name&quot;</p><p>git config --global user.email &quot;your eamil&quot;</p><p>�������֮�� ͨ��</p><p>git push -u origin master ?</p><p>ִ�к�һ��ʼ��Ϊ���û���������ˣ��������γ��ԣ�����û�����⡣</p><p>ԭ���</p><p>������ʾ����˼������ʹ��httpsЭ��û��Ȩ�ޣ�</p><p>���ǲ�����ssh��ͨ��ִ��</p><p>git config --list</p><p>���Բ鿴����ǰ��Ŀ������git��ַ�����뵽��Ŀ��Ŀ¼�µ�.git�ļ��У���һ��config���ļ���</p><p>���޸Ķ�Ӧ�����ĵ�ַΪssh��ʽ�ĵ�ַ��Ȼ����ִ��</p><p>git push -u origin master</p><p>���ֳɹ��ˡ�</p><p>�塢��Զ�ֿ̲����µİ汾��ȡ������</p><p>git pull</p><p>��1���������Զ���ļ��ͱ����ļ��ĳ�ͻ������Ҫ�����ͻ���ٽ���git push</p><p>ע�⣺</p><p>��1���Ŷ�Э��ʱ����һ�˴���Զ�̿⣬</p><p>��2��������Ա��Զ�̿���˺���ע��SSH, �������˺��е�SSHɾ������������ȡ������</p><p>��3��������Աͨ��https��ַ���鿴�ֿ�</p>`,42)])])}const c=e(r,[["render",n]]);export{l as __pageData,c as default};
